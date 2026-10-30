<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import DatePicker from 'primevue/datepicker'
import Checkbox from 'primevue/checkbox'
import RadioButton from 'primevue/radiobutton'
import ToggleSwitch from 'primevue/toggleswitch'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import ProgressBar from 'primevue/progressbar'
import Button from 'primevue/button'
import Message from 'primevue/message'

const name = ref('')
const amount = ref(0)
const description = ref('')
const category = ref(null)
const date = ref(null)
const active = ref(false)
const priority = ref('normal')
const darkMode = ref(false)
const nameInput = ref<InstanceType<typeof InputText>>()

const categories = [
  { label: 'Categoria A', value: 'a' },
  { label: 'Categoria B', value: 'b' },
  { label: 'Categoria C', value: 'c' }
]

const tableData = ref([
  { id: 1, name: 'Projeto Alpha', status: 'Ativo', progress: 75, date: '2026-10-01' },
  { id: 2, name: 'Projeto Beta', status: 'Pendente', progress: 30, date: '2026-10-05' },
  { id: 3, name: 'Projeto Gamma', status: 'Concluído', progress: 100, date: '2026-09-20' },
  { id: 4, name: 'Projeto Delta', status: 'Ativo', progress: 50, date: '2026-10-15' },
  { id: 5, name: 'Projeto Epsilon', status: 'Cancelado', progress: 10, date: '2026-08-12' }
])

function statusSeverity(status: string) {
  const map: Record<string, string> = {
    'Ativo': 'success',
    'Pendente': 'warn',
    'Concluído': 'info',
    'Cancelado': 'danger'
  }
  return map[status] ?? 'secondary'
}

onMounted(async () => {
  await nextTick()
  const el = nameInput.value?.$el
  const input = el?.tagName === 'INPUT' ? el : el?.querySelector('input')
  input?.focus()
})
</script>

<template>
  <div class="demo-page">

    <section class="demo-section">
      <h2 class="section-title">Formulário</h2>

      <div class="field">
        <label for="demo-name">Nome</label>
        <InputText id="demo-name" ref="nameInput" v-model="name" placeholder="Nome..." fluid />
      </div>

      <div class="field">
        <label for="demo-amount">Valor</label>
        <InputNumber id="demo-amount" v-model="amount" mode="currency" currency="EUR" locale="pt-PT" fluid />
      </div>

      <div class="field">
        <label for="demo-desc">Descrição</label>
        <Textarea id="demo-desc" v-model="description" placeholder="Descrição..." rows="3" fluid />
      </div>

      <div class="field">
        <label for="demo-category">Categoria</label>
        <Select
          id="demo-category"
          v-model="category"
          :options="categories"
          optionLabel="label"
          optionValue="value"
          placeholder="Selecione..."
          fluid
        />
      </div>

      <div class="field">
        <label for="demo-date">Data</label>
        <DatePicker id="demo-date" v-model="date" dateFormat="dd/mm/yy" placeholder="dd/mm/aaaa" fluid />
      </div>

      <div class="field">
        <label>Prioridade</label>
        <div class="radio-group">
          <div class="radio-item">
            <RadioButton v-model="priority" inputId="p-low" value="low" />
            <label for="p-low">Baixa</label>
          </div>
          <div class="radio-item">
            <RadioButton v-model="priority" inputId="p-normal" value="normal" />
            <label for="p-normal">Normal</label>
          </div>
          <div class="radio-item">
            <RadioButton v-model="priority" inputId="p-high" value="high" />
            <label for="p-high">Alta</label>
          </div>
        </div>
      </div>

      <div class="field-inline">
        <Checkbox v-model="active" :binary="true" inputId="demo-active" />
        <label for="demo-active">Ativo</label>
      </div>

      <div class="field-inline">
        <ToggleSwitch v-model="darkMode" inputId="demo-dark" />
        <label for="demo-dark">Modo escuro</label>
      </div>
    </section>

    <section class="demo-section">
      <h2 class="section-title">Feedback</h2>
      <Message severity="success" :closable="false">Operação concluída com sucesso.</Message>
      <Message severity="warn" :closable="false">Atenção: verifique os dados antes de continuar.</Message>
      <Message severity="error" :closable="false">Erro ao processar o pedido.</Message>
      <Message severity="info" :closable="false">Informação adicional disponível.</Message>
    </section>

    <section class="demo-section">
      <h2 class="section-title">Progresso</h2>
      <div class="progress-group">
        <div class="progress-item">
          <span class="progress-label">Projeto Alpha</span>
          <ProgressBar :value="75" />
        </div>
        <div class="progress-item">
          <span class="progress-label">Projeto Beta</span>
          <ProgressBar :value="30" />
        </div>
        <div class="progress-item">
          <span class="progress-label">Projeto Gamma</span>
          <ProgressBar :value="100" />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2 class="section-title">Tabela</h2>
      <DataTable :value="tableData" stripedRows size="small">
        <Column field="name" header="Projeto" />
        <Column field="status" header="Estado">
          <template #body="{ data }">
            <Tag :value="data.status" :severity="statusSeverity(data.status)" />
          </template>
        </Column>
        <Column field="progress" header="Progresso">
          <template #body="{ data }">
            <ProgressBar :value="data.progress" :showValue="true" style="height: 20px" />
          </template>
        </Column>
        <Column field="date" header="Data" />
      </DataTable>
    </section>

    <section class="demo-section">
      <h2 class="section-title">Botões</h2>
      <div class="button-group">
        <Button label="Principal" />
        <Button label="Secundário" severity="secondary" />
        <Button label="Contorno" severity="secondary" outlined />
        <Button icon="pi pi-check" aria-label="Confirmar" />
        <Button icon="pi pi-trash" severity="danger" outlined aria-label="Eliminar" />
      </div>
    </section>

    <section class="demo-section">
      <h2 class="section-title">Tags</h2>
      <div class="tag-group">
        <Tag value="Novo" severity="success" />
        <Tag value="Pendente" severity="warn" />
        <Tag value="Urgente" severity="danger" />
        <Tag value="Info" severity="info" />
        <Tag value="Padrão" severity="secondary" />
      </div>
    </section>

  </div>
</template>

<style scoped>
.demo-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.section-title {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--color-text-primary);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--color-border);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.field label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
}

.field-inline {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.field-inline label {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  cursor: pointer;
}

.radio-group {
  display: flex;
  gap: var(--spacing-lg);
}

.radio-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.radio-item label {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  cursor: pointer;
}

.progress-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.progress-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.progress-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}
</style>
