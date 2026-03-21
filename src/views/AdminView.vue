<template>
  <div class="flex h-screen bg-gray-50 font-sans text-gray-900">
    
    <aside class="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
      <div class="p-6">
        <h1 class="text-xl font-bold tracking-tight text-blue-400">Fonte da Vida</h1>
        <p class="text-xs text-slate-400 uppercase mt-1">Painel Administrativo</p>
      </div>

      <nav class="flex-1 mt-4 px-4 space-y-2">
        <button 
          v-for="item in menuItems" :key="item.id"
          @click="activeTab = item.id"
          :class="['w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all', 
                   activeTab === item.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white']"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span class="font-medium">{{ item.label }}</span>
        </button>
      </nav>

      <div class="p-4 border-t border-slate-800">
        <div class="flex items-center space-x-3 px-2">
          <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">G</div>
          <div class="overflow-hidden">
            <p class="text-sm font-medium truncate">Gabriel Costa</p>
            <p class="text-xs text-slate-500 uppercase">Admin </p>
          </div>
        </div>
      </div>
    </aside>

    <main class="flex-1 flex flex-col overflow-hidden">
      
      <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
        <div class="relative w-96">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <SearchIcon class="w-4 h-4" />
          </span>
          <input 
            type="text" 
            placeholder="Buscar por nome ou CPF... " 
            class="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white sm:text-sm transition-all"
          />
        </div>
        <div class="flex items-center space-x-4">
          <button class="p-2 text-gray-400 hover:text-blue-600 relative">
            <BellIcon class="w-6 h-6" />
            <span class="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>
        </div>
      </header>

      <div class="flex-1 overflow-y-auto p-8">
        
        <div v-if="activeTab === 'relatorios'">
          <header class="mb-8">
            <h2 class="text-2xl font-bold text-gray-800">Métricas de Impacto Social </h2>
            <p class="text-gray-500">Visão geral do desempenho da ONG este mês.</p>
          </header>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
              <div class="p-4 bg-blue-50 text-blue-600 rounded-xl"><UsersIcon class="w-6 h-6" /></div>
              <div>
                <p class="text-sm text-gray-500 font-medium uppercase">Pessoas Ativas </p>
                <h3 class="text-3xl font-bold text-gray-900">152</h3>
              </div>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
              <div class="p-4 bg-green-50 text-green-600 rounded-xl"><CalendarIcon class="w-6 h-6" /></div>
              <div>
                <p class="text-sm text-gray-500 font-medium uppercase">Atendimentos/Mês </p>
                <h3 class="text-3xl font-bold text-gray-900">843</h3>
              </div>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
              <div class="p-4 bg-orange-50 text-orange-600 rounded-xl"><TrendingUpIcon class="w-6 h-6" /></div>
              <div>
                <p class="text-sm text-gray-500 font-medium uppercase">Frequência Média </p>
                <h3 class="text-3xl font-bold text-gray-900">92%</h3>
              </div>
            </div>
          </div>

          <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h4 class="font-bold text-gray-800 mb-4">Exportação de Dados</h4>
            <div class="flex space-x-4">
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition shadow-md shadow-blue-100">
                Gerar PDF Mensal
              </button>
              <button class="border border-gray-200 hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-xl font-semibold transition">
                Ver Frequência por Turma 
              </button>
            </div>
          </div>
        </div>

        <div v-else class="flex flex-col items-center justify-center h-full text-gray-400">
          <p class="text-lg uppercase tracking-widest font-bold">Conteúdo de {{ activeTab }}</p>
          <p class="text-sm italic">Interface de gestão em desenvolvimento...</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// Nota: Em um projeto real, importe ícones de bibliotecas como Lucide-Vue ou Heroicons
const activeTab = ref('relatorios');

const menuItems = [
  { id: 'relatorios', label: 'Dashboard', icon: 'TrendingUpIcon' },
  { id: 'usuarios', label: 'Usuários', icon: 'ShieldCheckIcon' },
  { id: 'pessoas', label: 'Pessoas', icon: 'UsersIcon' },
  { id: 'turmas', label: 'Turmas', icon: 'BookOpenIcon' },
  { id: 'atendimentos', label: 'Atendimentos', icon: 'ClipboardListIcon' },
];
</script>