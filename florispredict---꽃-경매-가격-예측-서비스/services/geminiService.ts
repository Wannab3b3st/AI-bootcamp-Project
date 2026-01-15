
import { GoogleGenAI, Type } from "@google/genai";
import { PredictionData, MarketInsight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMarketInsight = async (data: PredictionData): Promise<MarketInsight> => {
  const prompt = `
    꽃 품목: ${data.flowerName}
    예 최대가: ${data.maxPrice}원
    예측 평균가: ${data.avgPrice}원
    예측 최소가: ${data.minPrice}원
    최근 추세: ${data.trend === 'up' ? '상승' : data.trend === 'down' ? '하락' : '보합'}

    위 데이터를 바탕으로 한국 꽃 경매 시장의 전망과 가격 변동 요인을 분석해주세요. 
    전문가적이지만 이해하기 쉬운 톤으로 작성해주세요.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "전체적인 시장 요약" },
            factors: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "가격에 영향을 미치는 주요 요인들" 
            },
            recommendation: { type: Type.STRING, description: "구매/판매 시점 추천" }
          },
          required: ["summary", "factors", "recommendation"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return {
      summary: result.summary || "데이터 분석 중 오류가 발생했습니다.",
      factors: result.factors || [],
      recommendation: result.recommendation || "관망을 추천합니다."
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      summary: "현재 인공지능 분석 기능을 사용할 수 없습니다.",
      factors: ["기후 요인", "수요량 변화", "계절적 특성"],
      recommendation: "경매 참여 전 실시간 시세를 다시 한번 확인하세요."
    };
  }
};
