import { runDevSimulation } from '../src/utils/devSimulation';

const result = runDevSimulation(20);
const sorted = Object.entries(result).sort((a, b) => b[1] - a[1]);
console.log('Simulation(20) distribution:');
for (const [key, value] of sorted) console.log(`${key}: ${value}`);
console.log('Covered types:', sorted.length);
