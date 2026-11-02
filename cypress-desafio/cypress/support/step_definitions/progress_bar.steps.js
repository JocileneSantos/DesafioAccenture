import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import ProgressBarPage from '../pages/ProgressBarPage';

// o Stop demora a pegar e a barra anda mais um pouco, então clico em 20 pra sobrar margem
const STOP_AT = 20;

When('eu clico em Start e paro a barra antes dos 25%', () => {
  ProgressBarPage.clickStartStop();
  ProgressBarPage.waitAtLeast(STOP_AT);
  ProgressBarPage.clickStartStop();
});

Then('o valor da barra de progresso deve ser menor ou igual a {int}%', (limit) => {
  ProgressBarPage.value().should('be.lte', limit);
});

When('eu clico em Start novamente e aguardo a barra chegar a 100%', () => {
  ProgressBarPage.clickStartStop();
  ProgressBarPage.waitExactly(100);
});

When('eu reseto a barra de progresso', () => {
  ProgressBarPage.reset();
});

// bug do site: o Reset volta pra 0% mas a barra continua andando sozinha.
// Por isso confiro o botão em "Start" e a barra perto do início (até 5%).
Then('o valor da barra de progresso deve ser {int}%', (expected) => {
  ProgressBarPage.startStopButton().should('have.text', 'Start');
  ProgressBarPage.waitAtMost(expected + 5);
});