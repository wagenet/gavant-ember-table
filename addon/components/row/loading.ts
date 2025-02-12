import Component from '@glimmer/component';

interface RowLoadingArgs {
    columns: any[];
}
export default class RowLoadingComponent extends Component<RowLoadingArgs> {
    cellClassNames: string = 'p-4';

    get colspan() {
        return this.args.columns.length;
    }
}
