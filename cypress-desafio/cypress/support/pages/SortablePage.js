import BasePage from './BasePage';

const elements = {
  listTab: '#demo-tab-list',
  listItems: '#demo-tabpane-list .list-group-item',
};

class SortablePage extends BasePage {
  openListTab() {
    cy.get(elements.listTab).click();
    cy.get(elements.listItems).should('be.visible');
  }

  itemTexts() {
    return cy.get(elements.listItems).then(($items) => {
      return $items.toArray().map((item) => item.innerText.trim());
    });
  }

  item(text) {
    return cy.contains(elements.listItems, text);
  }

  dragAndDrop(sourceText, targetText) {
    this.item(sourceText).dragTo(`${elements.listItems}:contains("${targetText}")`);
  }

  // posição por posição: se o item esperado não está lá, arrasta ele pra cima de quem está
  sortTo(desiredOrder) {
    desiredOrder.forEach((expectedText, position) => {
      this.itemTexts().then((currentTexts) => {
        const textInThisPosition = currentTexts[position];
        if (textInThisPosition !== expectedText) {
          this.dragAndDrop(expectedText, textInThisPosition);
        }
      });
    });
  }
}

export default new SortablePage();
