import $ from 'jquery'

import Garnish from 'garnish'

const _fieldDefaults = {
  id: false,
  label: false,
  instructions: false,
  required: false,
  locale: false,
  input: '',
  warning: false,
  errors: false
}

const _inputDefaults = {
  type: 'text',
  attributes: {},
  id: '',
  name: '',
  value: '',
  class: '',
  fullWidth: true
}

const _lightswitchDefaults = {
  attributes: {},
  name: '',
  checked: false
}

export default Garnish.Base.extend({

  $container: new $(),
  _sortOrder: 0,

  getSortOrder () {
    return this._sortOrder
  },

  setSortOrder (sortOrder) {
    const oldSortOrder = this._sortOrder
    this._sortOrder = sortOrder | 0

    if (oldSortOrder !== this._sortOrder) {
      this.trigger('change', {
        property: 'sortOrder',
        oldValue: oldSortOrder,
        newValue: this._sortOrder
      })
    }
  },

  getFocusElement () {
    return new $()
  },

  destroy () {
    this.trigger('destroy')
  },

  _field (settings = {}) {
    settings = Object.assign({}, _fieldDefaults, settings)

    const fieldHtml = []
    fieldHtml.push(`
      <div class="field">`)

    if (settings.label || settings.instructions) {
      if (settings.label) {
        fieldHtml.push(`
        <div class="heading">
          <label${settings.required ? ' class="required"' : ''}${settings.id ? ` for="${settings.id}"` : ''}>
            ${settings.label}`)

        if (settings.locale) {
          fieldHtml.push(`
            <span class="locale">${settings.locale}</span>`)
        }

        fieldHtml.push(`
          </label>
        </div>`)
      }

      if (settings.instructions) {
        fieldHtml.push(`
        <div class="instructions">${settings.instructions}</div>`)
      }
    }

    fieldHtml.push(`
        <div class="input${settings.errors ? ' errors' : ''}">
          ${settings.input}
        </div>`)

    if (settings.warning) {
      fieldHtml.push(`
        <p class="warning">${settings.warning}</p>`)
    }

    if (settings.errors) {
      fieldHtml.push(`
        <ul class="errors">`)

      for (const error of settings.errors) {
        fieldHtml.push(`
          <li>${error}</li>`)
      }

      fieldHtml.push(`
        </ul>`)
    }

    fieldHtml.push(`
      </div>`)

    return fieldHtml.join('')
  },

  _input (settings = {}) {
    settings = Object.assign({}, _inputDefaults, settings)

    settings.input = `
      <input class="text${settings.fullWidth ? ' fullwidth' : ''} ${settings.class}"
             type="${settings.type}"
             id="${settings.id}"
             name="${settings.name}"
             value="${settings.value}"
             ${this._attributes(settings.attributes)}
             autocomplete="off">`

    return this._field(settings)
  },

  _lightswitch (settings = {}) {
    settings = Object.assign({}, _lightswitchDefaults, settings)

    settings.input = `
      <div class="lightswitch${settings.checked ? ' on' : ''}" tabindex="0"${this._attributes(settings.attributes)}>
        <div class="lightswitch-container">
          <div class="label on"></div>
          <div class="handle"></div>
          <div class="label off"></div>
        </div>
        <input type="hidden" name="${settings.name}" value="${settings.checked ? '1' : ''}">
      </div>`

    return this._field(settings)
  },

  _attributes (attributes) {
    const attributesHtml = []

    for (const attribute in attributes) {
      attributesHtml.push(` ${attribute}="${attributes[attribute]}"`)
    }

    return attributesHtml.join('')
  }
})
