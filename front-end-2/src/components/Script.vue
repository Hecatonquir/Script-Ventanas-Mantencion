<script>
import getExcelInfo from "../backEndConexion/conexion";
import "../assets/Styles/Script.css";

export default {
  name: "Script-ventanas",

  data() {
    return {
      completed: "",
      review: "",
      fromDay: "",
      toDay: "",
      isVisible: false,
      enableButton: false,
      success: false,
      error: false,
      diff1: [],
      diff2: [],
      diffa: "",
      diffb: "",
      excelInfo: {},
      ex1: [],
      ex2: [],
    };
  },
  async created() {
    console.log("Se crea");
    let resp = await getExcelInfo();
    console.log("💥🟢  file: Script.vue:26  resp", resp);
  },
  async mounted() {
    console.log("Se monta");
  },

  methods: {
    async callBackEnd() {
      this.completed = "";
      this.review = "";
      this.isVisible = false;
      this.diff1 = [];
      this.diff2 = [];
      this.enableButton = true;

      let body = {
        fromDay: this.fromDay,
        toDay: this.toDay,
      };
      await getExcelInfo(body)
        .then((result) => {
          this.completed = result?.registro.join("\n");
          this.review = result?.minutas.join("\n");
        })
        .then(() => {
          this.comparisson(this.completed, this.review);
        });
    },
    async comparisson(completed, review) {
      this.ex1 = completed.split("\n");
      this.ex2 = review.split("\n");

      for (let i = 0; i < this.ex1.length; i++) {
        if (!this.ex2.includes(this.ex1[i])) this.diff1.push(this.ex1[i]);
      }

      for (let i = 0; i < this.ex2.length; i++) {
        if (!this.ex1.includes(this.ex2[i])) this.diff2.push(this.ex2[i]);
      }
      this.diff1 = this.diff1.filter((e) => e !== "");
      this.diff2 = this.diff2.filter((e) => e !== "");

      if (this.diff1.length === 0 && this.diff2.length === 0) {
        this.success = true;
      }

      (this.isVisible = true), (this.enableButton = false);
    },
  },
};
</script>

<template>
  <div class="home">
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
    <div class="content">
      <div class="input">
        <form @submit.prevent>
          <div style="display: flex; flex-direction: row">
            <div class="label">
              <label>Desde</label>
              <input type="date" required v-model="fromDay" />
            </div>
            <div class="label">
              <label>Hasta</label>
              <input type="date" required v-model="toDay" />
            </div>
          </div>
          <div
            style="
              width: 100%;
              display: flex;
              flex-direction: row;
              justify-content: space-around;
            "
          >
            <div class="label">
              <label>Registro</label>
              <textarea type="text" v-model="completed" />
            </div>
            <div class="label">
              <label>Minutas</label>
              <textarea type="text" v-model="review" />
            </div>
          </div>
          <el-button
            type="warning"
            :disabled="enableButton"
            @click="callBackEnd()"
            >Comparar</el-button
          >
        </form>
      </div>

      <div class="output">
        <div class="label">
          <label>Resultado:</label>
        </div>
        <div v-show="isVisible">
          <h2 v-if="success" class="success">
            Las Minutas CAB están al día! 🎉
          </h2>
          <div v-else>
            <h3>Faltan considerar las siguientes Minutas:</h3>
            <div class="error">
              <div class="result2">{{ diff2.join(" ") }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
