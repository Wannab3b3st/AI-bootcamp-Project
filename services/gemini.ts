
import { GoogleGenAI } from "@google/genai";
import { MarketState } from "../types";

export const generateMarketAdvice = async (state: MarketState): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    당신은 화훼 시장 전문 분석 AI 'BloomBridge Advisor'입니다. 
    현재 상황:
    - 경매장: ${state.selectedMarket}
    - 품목 부류: ${state.selectedCategory}
    
    분석 데이터 (ML Features):
    - 평균 공급 규모 (MA Amount): ${state.currentMetrics.ma_amount.toLocaleString()} 건
    - 현재 실시간 물량 (Total Quantity): ${state.currentMetrics.total_quantity.toLocaleString()} 건
    - 평균 낙찰 단가 (Mean Price): ${state.currentMetrics.unit_price.toLocaleString()} KRW
    - 프리미엄 비율 (Premium Ratio): ${state.currentMetrics.premium_ratio.toFixed(2)}
    - 하방 압력 (Low Pressure): ${state.currentMetrics.low_pressure.toLocaleString()} KRW
    
    예측 결과: 내일(T+1) 예상가 ${state.forecast.t1.mean_price.toLocaleString()} KRW.
    
    '${state.selectedCategory}' 부류의 시장 특성과 '${state.selectedMarket}'의 지역적 특성을 결합하여 농가와 구매자에게 줄 전략적 조언을 3문장 이내로 작성하세요.
    말투는 신뢰감 있는 B2B SaaS 분석가 톤이어야 합니다.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "데이터 분석 중 오류가 발생했습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "현재 실시간 분석 기능을 사용할 수 없습니다.";
  }
};
