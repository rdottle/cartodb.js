var _ = require('underscore');
var View = require('cdb/core/view');

/**
 * Category list item view
 */
module.exports = View.extend({

  tagName: 'li',
  className: 'Widget-listItem',

  events: {
    'click .js-button': '_onItemClick'
  },

  _TEMPLATE: ' ' +
    '<li class="Widget-listItem">'+
      '<button type="button" class="Widget-listItemInner Widget-listButton js-button <%- isDisabled ? \'is-disabled\' : \'\' %>">'+
        '<div class="Widget-contentSpaced">'+
          '<p class="Widget-textSmall Widget-textSmall--bold Widget-textSmall--upper" title="<%- name %>"><%- name %></p>'+
          '<% if (value > 0) { %>'+
            '<p class="Widget-textSmaller" title="<%- value %>"><%- value %> (~<%- percentage %>%)</p>'+
          '<% } %>'+
        '</div>'+
        '<div class="Widget-progressBar">'+
          '<div class="Widget-progressState" style="width: <%- percentage %>%"></div>'+
        '</div>'+
      '</button>'+
    '</li>',

  initialize: function(options) {
    this.filter = options.filter;
    this._initBinds();
  },

  render: function() {
    var template = _.template(this._TEMPLATE);
    var value = this.model.get('count');

    this.$el.html(
      template({
        name: this.model.get('name'),
        value: Math.ceil(value),
        percentage: Math.ceil((value / this.model.get('maxCount')) * 100),
        isDisabled: !this.model.get('selected') ? 'is-disabled' : ''
      })
    );

    return this;
  },

  _initBinds: function() {
    this.model.bind('change', this.render, this);
  },

  _onItemClick: function() {
    this.trigger('itemClicked', this.model, this);
  }
});
