const spendingChart = document.querySelector('.spending__chart');
const date = new Date();
const today = date.getDay();

const highestAmount = data => {
    const amounts = [];
    data.forEach(item => amounts.push(item.amount));
    amounts.sort((a, b) => b - a)
    return amounts[0];
}

const markupData = data => {
    const highestAmountValue = highestAmount(data);
    
    data.forEach((item, i) => {
        spendingChart.innerHTML += `
            <div class="spending__chart--item">
                <div class="spending__chart--bar${i + 1 === today ? ' current-day' : ''}" style="height: ${Math.trunc(150 * (item.amount / highestAmountValue))}px;"></div>
                <div class="spending__chart--amount">$${item.amount}</div>
                <div class="spending__chart--legend">${item.day}</div>
            </div>
        `;
    })
}

const fetchData = async () => {
    try {
        const requestData = await fetch('data.json');
        if (!requestData.ok) throw new Error(error);
        const result = await requestData.json();
        return markupData(result);
    }
    catch(error) {
        console.error(error);
    }
}

fetchData();