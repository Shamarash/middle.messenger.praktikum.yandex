export default `<input id="{{id}}"
           name="{{id}}"
           placeholder=" "
           type="{{type}}"
           title="{{title}}"
           value="{{value}}"
        {{#if error}}
           class="inputErrorText"
        {{/if}}
        {{#if pattern}}
           pattern="{{pattern}}"
        {{/if}}
        {{#if disabled}}
           disabled
        {{/if}}
        {{#if required}}
           required
        {{/if}}
           value=""
           class="input {{inputClass}}"/>
    <label for="{{id}}">
        {{placeholder}}
    </label>
    {{#if error}}
        <span class="inputError">
            {{error}}
        </span>
    {{/if}}`
