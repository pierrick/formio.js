import NestedComponent from '../_classes/nested/NestedComponent';

export default class PanelComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      label: 'Panel',
      type: 'panel',
      key: 'panel',
      title: '',
      theme: 'default',
      breadcrumb: 'default',
      components: [],
      clearOnHide: false,
      input: false,
      tableView: false,
      persistent: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Panel',
      icon: 'fa fa-list-alt',
      group: 'layout',
      documentation: 'http://help.form.io/userguide/#panels',
      weight: 30,
      schema: PanelComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
  }

  init() {
    this._collapsed = this.component.collapsed;
    this.addComponents();
  }

  get defaultSchema() {
    return PanelComponent.schema();
  }

  getContainer() {
    return this.panelBody;
  }

  get panelKey() {
    return `panel-${this.key}`;
  }

  render() {
    return super.render(this.renderTemplate('panel', {
      panelKey: this.panelKey,
      bootstrap4Theme: this.bootstrap4Theme,
      children: this.renderComponents(),
      collapsed: this.collapsed,
    }));
  }

  hydrate(element) {
    this.loadRefs(element, {[this.panelKey]: 'single'});
    super.hydrate(element);

    if (this.refs[this.panelKey]) {
      this.hydrateComponents(this.refs[this.panelKey]);
    }
  }
}
