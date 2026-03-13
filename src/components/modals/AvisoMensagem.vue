<template>
  <!-- Overlay -->
  <div class="overlay" @click.self="fecharModal">
    <!-- Modal -->
    <div class="modal" :class="props.sucesso ? 'sucesso' : 'erro'">
      <!-- Ícone -->
      <div class="icone">
        <font-awesome-icon v-if="props.sucesso" icon="fa-solid fa-check" />

        <font-awesome-icon v-else icon="fa-solid fa-xmark" />
      </div>

      <!-- Mensagem -->
      <p class="mensagem">
        {{ props.messagem }}
      </p>

      <!-- Botão -->
      <button class="btn-fechar" @click="fecharModal">Fechar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  messagem: String,
  sucesso: Boolean,
})

const emit = defineEmits(['fecharModal'])

function fecharModal() {
  emit('fecharModal', props.sucesso)
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 999;
}

.modal {
  border-radius: 12px;
  padding: 30px;
  width: 320px;

  text-align: center;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* SUCESSO */

.sucesso {
  background: #e8f9ee;
  border: 2px solid #6fdc8c;
}

.sucesso .icone {
  color: #28a745;
}

/* ERRO */

.erro {
  background: #fdeaea;
  border: 2px solid #f08080;
}

.erro .icone {
  color: #e03131;
}

.icone {
  font-size: 40px;
  margin-bottom: 15px;
}

.mensagem {
  font-size: 16px;
  margin-bottom: 20px;
}

.btn-fechar {
  border: none;
  padding: 10px 20px;
  border-radius: 8px;

  color: white;
  cursor: pointer;
  font-weight: bold;
}

.sucesso .btn-fechar {
  background: #6fdc8c;
}

.erro .btn-fechar {
  background: #e03131;
}
</style>
