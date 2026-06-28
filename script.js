document.addEventListener('DOMContentLoaded', () => {
    const dataGrid = document.getElementById('data-grid');
    const refreshBtn = document.getElementById('refresh-btn');
    const loader = document.getElementById('loading-indicator');
    const errorBox = document.getElementById('error-message');

    // Using CoinGecko Free API to pull actual live tech currency trends
    const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,cardano&order=market_cap_desc';

    async function fetchMarketData() {
        // Toggle interface elements to show connection status
        loader.style.display = 'block';
        errorBox.style.display = 'none';
        dataGrid.innerHTML = '';

        try {
            const response = await fetch(API_URL);
            
            if (!response.ok) {
                throw new Error('Network error received.');
            }

            const data = await response.json();
            renderGrid(data);
        } catch (error) {
            console.error('API Pull Interrupted: ', error);
            errorBox.style.display = 'block';
        } finally {
            loader.style.display = 'none';
        }
    }

    // Function loop map to cleanly push components onto user display screens
    function renderGrid(assets) {
        assets.forEach(asset => {
            const isPositive = asset.price_change_percentage_24h >= 0;
            const changeClass = isPositive ? 'positive' : 'negative';
            const changeSign = isPositive ? '+' : '';

            const card = document.createElement('div');
            card.className = 'data-card';
            card.innerHTML = `
                <div class="card-top">
                    <span class="asset-name">${asset.name}</span>
                    <span class="asset-symbol">${asset.symbol.toUpperCase()}</span>
                </div>
                <div class="asset-price">$${asset.current_price.toLocaleString()}</div>
                <div class="card-stats">
                    <span>24h Change:</span>
                    <span class="pct-change ${changeClass}">${changeSign}${asset.price_change_percentage_24h.toFixed(2)}%</span>
                </div>
            `;
            dataGrid.appendChild(card);
        });
    }

    // Assign interactive refresh actions
    refreshBtn.addEventListener('click', fetchMarketData);

    // Initial boot sequence call execution
    fetchMarketData();
});
