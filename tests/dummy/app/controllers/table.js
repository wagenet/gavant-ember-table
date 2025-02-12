import Controller from '@ember/controller';
import { A } from '@ember/array';
import { action } from '@ember/object';
import { later } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';
import rsvp from 'rsvp';
import { inject as service } from '@ember/service';

class TableController extends Controller {
    @service media;

    @tracked foobar = 'bar';
    @tracked expandedRows = A([]);
    @tracked hasMore = true;
    @tracked isLoading = false;
    @tracked sorts = [{ valuePath: 'date', isAscending: false }];
    @tracked panPosition = 0;
    @tracked columns = A([
        {
            valuePath: 'date',
            name: 'Date',
            cellComponent: 'table/cell/table-meta',
            isFixedLeft: true,
            width: 200,
            staticWidth: 200,
            isSortable: true
        },
        {
            valuePath: 'name',
            name: 'Name',
            isFixedLeft: false,
            width: 100,
            staticWidth: 100,
            isSortable: true
        },
        {
            valuePath: 'age',
            name: 'Age',
            isFixedLeft: false,
            textAlign: 'right',
            width: 100,
            staticWidth: 100
        },
        {
            valuePath: 'tall',
            name: 'Tall',
            isFixedLeft: false,
            width: 100,
            staticWidth: 100,
            maxWidth: 100,
            minWidth: 100
        },
        {
            valuePath: 'short',
            name: 'Short',
            isFixedLeft: false,
            width: 100,
            staticWidth: 200,
            maxWidth: 100,
            minWidth: 100
        },
        {
            valuePath: 'id',
            cellComponent: 'table/cell/button',
            width: 225,
            staticWidth: 225,
            maxWidth: 225,
            minWidth: 225,
            toggleRow: this.toggleRow
        }
    ]);

    @tracked otherColumns = false;

    @tracked model = [];

    footerData = [{ age: 295 }];

    @tracked resizeDebounce = 100;
    @tracked showHeader = true;
    @tracked stripedRows = false;
    @tracked enableSort = true;

    @action
    updateFoobar(event) {
        this.foobar = event.target.value;
    }

    @action
    loadMoreModels() {
        this.isLoading = true;
        return new rsvp.Promise((resolve) => {
            later(() => {
                const newRows = [];
                for (let i = 0; i <= 10; i++) {
                    newRows.push({
                        date: new Date().toISOString(),
                        name: `New Row ${i}`,
                        age: 150,
                        tall: false,
                        short: true,
                        id: `${Date.now() + i}`
                    });
                }
                this.model.pushObjects(newRows);
                this.isLoading = false;
                return resolve(newRows);
            }, 500);
        });
    }

    @action
    updateSorts(newSorts) {
        this.sorts = newSorts;
    }

    @action
    toggleRow(rowValue) {
        const expandedRows = this.expandedRows.concat([]);
        const rowExpanded = expandedRows.includes(rowValue);
        if (rowExpanded) {
            const ind = expandedRows.indexOf(rowValue);
            expandedRows.splice(ind, 1);
        } else {
            expandedRows.push(rowValue);
        }
        this.expandedRows = expandedRows;
    }

    @action
    toggleColumns() {
        this.resizeDebounce = this.resizeDebounce === 100 ? 2000 : 100;
        this.showHeader = !this.showHeader;
        this.stripedRows = !this.stripedRows;
        this.enableSort = !this.enableSort;
    }

    @action
    updatePanPosition() {
        this.panPosition = this.panPosition + 1;
    }
}

export default TableController;
