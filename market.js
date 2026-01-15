document.addEventListener('DOMContentLoaded', () => {
    const marketGroup = document.getElementById('market-group');
    const categoryGroup = document.getElementById('category-group');
    const varietyList = document.getElementById('variety-list');
    const selectionInfo = document.getElementById('selection-info');

    // 1. 시장 선택 (기존 토글 로직 유지)
    marketGroup.addEventListener('click', (e) => {
        const target = e.target.closest('.chip');
        if (!target) return;
        if (target.classList.contains('active')) {
            target.classList.remove('active');
        } else {
            marketGroup.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            target.classList.add('active');
        }
        updateInfo();
    });

    // 2. 품목 선택 (기존 필터링 로직 유지)
    categoryGroup.addEventListener('click', (e) => {
        const target = e.target.closest('.chip');
        if (!target) return;
        const cards = varietyList.querySelectorAll('.card');
        if (target.classList.contains('active')) {
            target.classList.remove('active');
            cards.forEach(card => card.classList.remove('show', 'active'));
        } else {
            categoryGroup.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            target.classList.add('active');
            const selectedCat = target.innerText.includes("프리지아") ? "프리지아" : "국화";
            cards.forEach(card => {
                card.classList.remove('show', 'active');
                if (card.getAttribute('data-category') === selectedCat) {
                    card.classList.add('show');
                }
            });
        }
        updateInfo();
    });

    // 3. 품종 카드 선택 (수정: 클릭 시 상세 페이지 이동)
    varietyList.addEventListener('click', (e) => {
        const target = e.target.closest('.card');
        if (!target || !target.classList.contains('show')) return;

        // 클릭 시 시각적 피드백을 위해 active 추가
        varietyList.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
        target.classList.add('active');
        
        // 품종 이름 가져오기 (예: 쏠레이)
        const varietyName = target.querySelector('strong').innerText;
        
        // 상세 페이지로 이동 (URL 파라미터로 이름 전달)
        setTimeout(() => {
            window.location.href = `detail.html?variety=${encodeURIComponent(varietyName)}`;
        }, 150); // 아주 짧은 지연시간을 주어 파란색 테두리를 확인하게 함
    });

    function updateInfo() {
        const m = document.querySelector('#market-group .chip.active')?.innerText.replace('🏢 ', '') || "시장 선택";
        const c = document.querySelector('#category-group .chip.active')?.innerText.split(' ')[1] || "품목 선택";
        const v = document.querySelector('#variety-list .card.active strong')?.innerText || "품종 선택";
        selectionInfo.innerHTML = `${m} > ${c} > <strong>${v}</strong>`;
    }
});