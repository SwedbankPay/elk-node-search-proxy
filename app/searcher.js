import ElasticSearch from '@elastic/elasticsearch';
const baseUrl = process.env.ENV === 'stage'
  ? 'https://developer.stage.swedbankpay.com'
  : 'https://developer.swedbankpay.com';

function getElasticSearchClient() {
  const elasticHosts = process.env.ELASTICSEARCH_HOSTS || 'http://192.168.1.175:9200';
  const elasticUsername = process.env.ELASTICSEARCH_USERNAME || 'none';
  const elasticPassword = process.env.ELASTICSEARCH_PASSWORD || 'none';

  return new ElasticSearch.Client({
    node: elasticHosts,
    auth: {
      username: elasticUsername,
      password: elasticPassword
    },
  });
}

function mapHit(hit) {
  const url = new URL(hit._source.url, baseUrl)

  return {
    title: hit._source.title,
    url: url.href,
    highlight: hit.highlight
  };
}

async function search(queryState) {
  if (queryState == null || queryState.query == null) {
    return { hits: [] };
  }

  const elasticIndex = process.env.ELASTICSEARCH_INDEX || 'test-psp-developer-*'
  const elasticSearchClient = getElasticSearchClient();
  const { body } = await elasticSearchClient.search({
    index: elasticIndex,
    body: {
      from: queryState.startIndex,
      size: queryState.size,
      query: {
        query_string: {
          fields: ["text", "title"],
          query: queryState.elasticQuery,
          default_operator: "AND"
        }
      },
      highlight: {
        fields: {
          text: {
            fragment_size: 250,
            number_of_fragments: 3
          }
        },
        tags_schema: "styled"
      }
    }
  });

  return {
    total: body.hits.total.value,
    hits: body.hits.hits.map(mapHit)
  };
}

export default { search };
