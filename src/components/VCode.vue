<script setup lang="ts">
interface Props {
  length?: number;
}

const props = withDefaults(defineProps<Props>(), { length: 4 });
const model = defineModel<string>({ required: true });
const code: string[] = Array(props.length);
let dataFromPaste: string[] | undefined;
const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function isNumber(event: KeyboardEvent) {
  const target = event.target as HTMLInputElement;
  target.value = '';
  const keyPressed: string = event.key;
  if (!keysAllowed.includes(keyPressed)) {
    event.preventDefault();
  }
}
function handleInput(event: Event) {
  const inputType = (event as InputEvent).inputType;
  let currentActiveElement = event.target as HTMLInputElement;

  if (inputType === 'insertText') (currentActiveElement.nextElementSibling as HTMLElement)?.focus();

  if (inputType === 'insertFromPaste' && dataFromPaste) {
    for (const num of dataFromPaste) {
      let id: number = parseInt(currentActiveElement.id.split('_')[1]);
      currentActiveElement.value = num;
      code[id] = num;
      if (currentActiveElement.nextElementSibling) {
        currentActiveElement = currentActiveElement.nextElementSibling as HTMLInputElement;
        (currentActiveElement.nextElementSibling as HTMLElement)?.focus();
      }
    }
  }
  model.value = code.join('');
}
function handleDelete(event: Event) {
  //keydown event = move to previous element then only delete number

  let value = (event.target as HTMLInputElement).value;
  let currentActiveElement = event.target as HTMLInputElement;
  if (!value) (currentActiveElement.previousElementSibling as HTMLElement)?.focus();
}

function onPaste(event: ClipboardEvent) {
  dataFromPaste = event.clipboardData?.getData('text').trim().split('');

  if (dataFromPaste) {
    for (const num of dataFromPaste) {
      if (!keysAllowed.includes(num)) event.preventDefault();
    }
  }
}
</script>

<template>
  <div class="text-center">
    <form class="flex gap-4">
      <input
        v-for="(n, index) in code"
        :id="'input_' + index"
        :key="index"
        v-model="code[index]"
        class="caret-transparent text-center text-xl w-16 md:w-20"
        type="number"
        pattern="\d*"
        maxlength="1"
        @input="handleInput"
        @keypress="isNumber"
        @keydown.delete="handleDelete"
        @paste="onPaste"
      />
    </form>
  </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  appearance: none;
  margin: 0;
}
</style>
