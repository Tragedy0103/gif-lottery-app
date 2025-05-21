<script setup>
import { ref, onMounted } from 'vue';

// 狀態管理
const showLaunchScreen = ref(true);
const showMainScreen = ref(false);
const showResultScreen = ref(false);
const currentResult = ref(null);

// 抽獎結果與機率設定
// 格式: { gif: 圖片路徑, probability: 機率權重 }
const resultOptions = [
  { gif: `${import.meta.env.BASE_URL}assets/result1.png`, probability: 50  },
  { gif: `${import.meta.env.BASE_URL}assets/result2.png`, probability: 30 },
  { gif: `${import.meta.env.BASE_URL}assets/result3.png`, probability: 20 }
];

// 計算總權重
const totalWeight = resultOptions.reduce((sum, option) => sum + option.probability, 0);

// 啟動畫面顯示後自動切換到主畫面
onMounted(() => {
  setTimeout(() => {
    showLaunchScreen.value = false;
    showMainScreen.value = true;
  }, 3000); // 3秒後自動切換
});

// 抽獎邏輯
const startLottery = () => {
  // 根據機率權重選擇結果
  const randomValue = Math.random() * totalWeight;
  let weightSum = 0;
  
  for (const option of resultOptions) {
    weightSum += option.probability;
    if (randomValue < weightSum) {
      currentResult.value = option.gif;
      break;
    }
  }
  
  // 切換到結果畫面
  showMainScreen.value = false;
  showResultScreen.value = true;
};

</script>

<template>
  <div class="lottery-container">
    <!-- 啟動畫面 -->
    <div v-if="showLaunchScreen" class="screen launch-screen">
      <img src="/src/assets/launch.gif" alt="Launch Screen" class="gif-image">
    </div>
    
    <!-- 主抽獎畫面 -->
    <div v-if="showMainScreen" class="screen main-screen">
      <h1>點擊下方圖片進行抽獎</h1>
      <div class="gif-container" @click="startLottery">
        <img src="/src/assets/main.gif" alt="Click to start" class="gif-image clickable">
      </div>
      <div class="instruction">點擊圖片抽獎</div>
    </div>
    
    <!-- 結果畫面 -->
    <div v-if="showResultScreen" class="screen result-screen">
      <h1>抽獎結果</h1>
      <div class="gif-container">
        <img :src="currentResult" alt="Lottery Result" class="gif-image result-image">
      </div>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

.lottery-container {
  max-width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.screen {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.gif-container {
  margin: 20px 0;
  position: relative;
  max-width: 100%;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.gif-image {
  max-width: 100%;
  max-height: 70vh;
  display: block;
}

.clickable {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.clickable:hover {
  transform: scale(1.02);
}

.launch-screen {
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@keyframes pulse {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.instruction {
  margin-top: 15px;
  font-size: 18px;
  color: #666;
}

.result-image {
  animation: popIn 0.5s ease-out;
}

@keyframes popIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  70% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 響應式設計 */
@media (max-width: 768px) {
  h1 {
    font-size: 24px;
  }
  
  .gif-image {
    max-height: 50vh;
  }

}
</style>
