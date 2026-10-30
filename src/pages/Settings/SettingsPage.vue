<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import ToggleSwitch from 'primevue/toggleswitch'
import InputNumber from 'primevue/inputnumber'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { useSettings } from '@/composables/useSettings'
import { usePageActions } from '@/composables/usePageActions'

const toast = useToast()
const confirm = useConfirm()
const { settings, reset } = useSettings()
const { setActions } = usePageActions()
const nameInput = ref<InstanceType<typeof InputText>>()

const languages = [
  { label: 'Português', value: 'pt' },
  { label: 'English', value: 'en' },
  { label: 'Español', value: 'es' },
  { label: 'Français', value: 'fr' }
]

function onSave() {
  toast.add({ severity: 'success', summary: 'Guardado', detail: 'Definições guardadas com sucesso.', life: 2000 })
}

function onReset() {
  confirm.require({
    message: 'Repor todas as definições para os valores iniciais?',
    header: 'Repor definições',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Repor',
    rejectLabel: 'Cancelar',
    accept: () => {
      reset()
      toast.add({ severity: 'info', summary: 'Reposto', detail: 'Definições repostas.', life: 2000 })
    }
  })
}

setActions([
  { icon: 'pi pi-check', label: 'Guardar', handler: onSave },
  { icon: 'pi pi-refresh', label: 'Repor', handler: onReset }
])

onMounted(async () => {
  await nextTick()
  const el = nameInput.value?.$el
  const input = el?.tagName === 'INPUT' ? el : el?.querySelector('input')
  input?.focus()
})
</script>

<template>
  <div class="settings-page">
    <Toast />
    <ConfirmDialog />

    <section class="settings-section">
      <h2 class="section-title">Perfil</h2>

      <div class="field">
        <label for="settings-name">Nome</label>
        <InputText id="settings-name" ref="nameInput" v-model="settings.userName" placeholder="O seu nome..." fluid />
      </div>

      <div class="field">
        <label for="settings-email">Email</label>
        <InputText id="settings-email" v-model="settings.email" placeholder="email@exemplo.com" fluid />
      </div>

      <div class="field">
        <label for="settings-language">Idioma</label>
        <Select
          id="settings-language"
          v-model="settings.language"
          :options="languages"
          optionLabel="label"
          optionValue="value"
          fluid
        />
      </div>
    </section>

    <section class="settings-section">
      <h2 class="section-title">Preferências</h2>

      <div class="field-toggle">
        <div class="field-toggle-info">
          <span class="field-toggle-label">Notificações</span>
          <span class="field-toggle-desc">Receber notificações da aplicação</span>
        </div>
        <ToggleSwitch v-model="settings.notifications" />
      </div>

      <div class="field-toggle">
        <div class="field-toggle-info">
          <span class="field-toggle-label">Sons</span>
          <span class="field-toggle-desc">Reproduzir sons nas interações</span>
        </div>
        <ToggleSwitch v-model="settings.soundEnabled" />
      </div>

      <div class="field-toggle">
        <div class="field-toggle-info">
          <span class="field-toggle-label">Guardar automaticamente</span>
          <span class="field-toggle-desc">Guardar alterações ao sair dos formulários</span>
        </div>
        <ToggleSwitch v-model="settings.autoSave" />
      </div>

      <div class="field">
        <label for="settings-items">Itens por página</label>
        <InputNumber
          id="settings-items"
          v-model="settings.itemsPerPage"
          :min="5"
          :max="50"
          :step="5"
          showButtons
          fluid
        />
      </div>
    </section>

    <section class="settings-section">
      <h2 class="section-title">Sobre</h2>
      <div class="about-info">
        <div class="about-row">
          <span class="about-label">Versão</span>
          <span class="about-value">0.1.0</span>
        </div>
        <div class="about-row">
          <span class="about-label">Framework</span>
          <span class="about-value">Vue 3 + PrimeVue</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.settings-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.settings-section {
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

.field-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm) 0;
}

.field-toggle-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.field-toggle-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-primary);
}

.field-toggle-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.about-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.about-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-xs) 0;
}

.about-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.about-value {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  font-weight: 500;
}
</style>
