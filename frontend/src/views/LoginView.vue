<template>
  <div class="login-container">
    <div class="content_wrap">
      <div class="login-box">
        <h1>监控系统登录</h1>
        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label for="username">Username:</label>
            <input type="text" v-model="username" id="username" required />
          </div>
          <div class="input-group">
            <label for="password">Password:</label>
            <input type="password" v-model="password" id="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  name: 'LoginView',
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const handleLogin = async () => {
      try {
        // 假设后端API是 /api/login
        const response = await axios.post('http://localhost:3000/api/login', {
          username: username.value,
          password: password.value,
        });

        if (response.status === 200) {
          // 登录成功，重定向到
          router.push('/index');
        } else {
          errorMessage.value = 'Invalid username or password';
        }
      } catch (error) {
        errorMessage.value = 'Login failed. Please try again.';
      }
    };

    return {
      username,
      password,
      errorMessage,
      handleLogin,
    };
  },
});
</script>

<style scoped>
.content_wrap {
  width: 100%;
  height: 100%;
  /* 调整登录框位置 */
  padding: 12% 16px 16px 55%;
  box-sizing: border-box;
  background-image: url("~/assets/img/pageBg.png");
  background-size: cover;
  background-position: center center;
}

.login-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}

.login-box {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #333;
}

.form {
  display: flex;
  flex-direction: column;
}

.input-group {
  margin-bottom: 1rem;
}

label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
}

button:hover {
  background-color: #38a672;
}

p {
  margin-top: 1rem;
  color: red;
}
</style>
