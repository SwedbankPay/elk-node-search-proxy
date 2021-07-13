FROM swedbankpay/jekyll-plantuml:2.2.2

ENV JEKYLL_ENV="${JEKYLL_ENV}"

COPY ./wait_for_elasticsearch.sh ${JEKYLL_VAR_DIR}/entrypoint/sh/
RUN chmod +x ${JEKYLL_VAR_DIR}/entrypoint/sh/wait_for_elasticsearch.sh
# COPY ./_es_settings.yml ${JEKYLL_VAR_DIR}/entrypoint/
#  custom_settings: _es_settings.yml # Optional. No default. Relative to your src folder
# custom_mappings: _es_mappings.yml # Optional. No default. Relative to your src folder

ENTRYPOINT ["/var/jekyll/entrypoint/sh/wait_for_elasticsearch.sh"]
