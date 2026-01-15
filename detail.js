document.addEventListener('DOMContentLoaded', () => {
    // 쏠레이 가격 예측으로 타이틀 고정
    document.getElementById('detail-title').innerText = "쏠레이 가격 예측";

    const ctx = document.getElementById('predictionChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['05-01', '05-02', '05-03', '05-04', '05-05'],
            datasets: [
                { label: '최고가', data: [13500, 14300, 14800, 15200, 15400], borderColor: '#ff4d6d', tension: 0.3 },
                { label: '평균가', data: [11000, 11500, 12200, 12500, 12800], borderColor: '#28a745', tension: 0.3 },
                { label: '최저가', data: [8500, 9000, 9200, 9500, 9200], borderColor: '#007bff', tension: 0.3 }
            ]
        },
        options: {
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { grid: { display: false } } }
        }
    });
});