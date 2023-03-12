export default `<input id="{{id}}"
           name="{{id}}"
           placeholder="{{#if noPlaceholder}}{{placeholder}}{{else}}{{/if}}"
           type="{{type}}"
           title="{{title}}"
           autocomplete="new-password"
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
    {{#if noPlaceholder}}
    {{else}}
                   {{placeholder}}
        {{/if}}
    </label>
    {{#if attributes.error}}
        <span class="inputError">
            {{attributes.error}}
        </span>
    {{/if}}`
