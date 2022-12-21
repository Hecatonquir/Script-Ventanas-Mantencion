<script>
export default {
  data() {
    return {
      completed: "",
      review: "",
      isVisible: false,
      success: false,
      error: false,
      diff1: [],
      diff2: [],
      diffa: "",
      diffb: "",
    };
  },
  methods: {
    comparisson(completed, review) {
      this.isVisible = true;
      (this.diff1 = []), (this.diff2 = []);

      let ex1 = completed.split("\n");

      let ex2 = review.split("\n");

      for (let i = 0; i < ex1.length; i++) {
        if (!ex2.includes(ex1[i])) this.diff1.push(ex1[i]);
      }

      for (let i = 0; i < ex2.length; i++) {
        if (!ex1.includes(ex2[i])) this.diff2.push(ex2[i]);
      }
      this.diff1 = this.diff1.filter((e) => e !== "");
      this.diff2 = this.diff2.filter((e) => e !== "");

      if (this.diff1.length === 0 && this.diff2.length === 0) {
        this.success = true;
        this.error = false;
      } else {
        this.success = false;
        this.error = true;
      }
    },
  },
};
</script>

<template>
  <div class="about">
    <div class="title">
      <a
        href="https://google.com"
        target="_blank"
        style="width: 40%; display: flex; justify-content: center"
      >
        <img
          className="logo"
          src="../assets/Logo.png"
          alt="Vite logo"
          style="height: 100px"
        />
      </a>
      <div style="width: 60%; display: flex; justify-content: flex-start">
        <h1>Ventanas de Mantención</h1>
      </div>
    </div>
    <form @submit.prevent>
      <div class="form_container">
        <div class="label">
          <label>Realizados</label>
          <textarea type="text" required v-model="completed" />
        </div>
        <div class="label">
          <label>Revisar</label>
          <textarea type="text" required v-model="review" />
        </div>
      </div>
      <button @click="comparisson(completed, review)">Comparar</button>
    </form>
    <div v-show="isVisible" class="result">
      <h2>Resultado:</h2>
      <h2 v-if="success" class="success">Ambas columnas son iguales! 🎉</h2>
      <div v-else>
        <h3>Existen diferencias entre ambas columnas:</h3>
        <div class="error">
          <div class="result2">{{ diff1.join(" \n ") }}</div>
          <div class="result2">{{ diff2.join("\n") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #2b3a55;
}
.form_container {
  width: 100%;

  justify-content: space-around;
  display: flex;
}
.label {
  display: flex;
  flex-direction: column;
  margin: 1rem;
}
label {
  color: #f2e5e5;
  display: inline-block;
  margin: 1rem;
  font-size: 2em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
textarea {
  border-radius: 10px;
  min-height: 30vh;
  max-width: 200px;
  min-width: 200px;
}
.result {
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  width: 100%;
  padding: 1rem;
}
.result2 {
  background-color: #e8c4c4;
  color: #2b3a55;
  display: inline-block;
  margin: 1rem;
  padding: 0.5rem;
  font-size: 2em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  max-width: 300px;
  min-width: 100px;
  border-radius: 5px;
}
.error {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.title {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
h1 {
  font-size: 30px;
  font-weight: 900 !important;
  color: #f2e5e5;
}

button {
  width: fit-content;
  padding: 0.1rem 0.5rem;
  margin: 1rem;
  background-color: #ce7777;
  color: #f2e5e5;
  font-size: 2em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  border-radius: 5px;
}
</style>
