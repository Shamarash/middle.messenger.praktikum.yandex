export default `<input id="{{id}}"
           name="{{id}}"
           placeholder=" "
           type="{{type}}"
           title="{{title}}"
        {{#if pattern}}
           pattern="{{pattern}}"
        {{/if}}
        {{#if disabled}}
           disabled
        {{/if}}
        {{#if required}}
           required
        {{/if}}
           class="input {{inputClass}} {{#if error}}
          inputErrorText
        {{/if}}"/>
    <label for="{{id}}">
        {{placeholder}}
    </label>
    {{#if attributes.error}}
        <span class="inputError">
            {{attributes.error}}
        </span>
    {{/if}}`
