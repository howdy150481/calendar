import Cleave from "cleave.js";

export function formatDateField(id: string) {
  new Cleave('#' + id, {
    date: true,
    delimiter: '.',
    datePattern: ['d', 'm', 'Y']
  });
}

export function formatTimeField(id: string) {
  new Cleave('#' + id, {
    time: true,
    timePattern: ['h', 'm']
  });
}

