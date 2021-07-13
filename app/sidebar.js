import fetch from 'node-fetch';

class Sidebar {
    async getSidebar() {
        // TODO: Find out a way to fetch the sidebar inside app.js or somewhere more global
        const response = await fetch('https://developer.stage.swedbankpay.com/sidebar.html');
        return await response.text();
    }
}

export default new Sidebar();
