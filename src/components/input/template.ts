export default `<input
           name="{{attributesWithSelector.input.id}}"
           placeholder=""
           autocomplete="new-password"/>
    <label for="{{attributesWithSelector.input.id}}">
                   {{placeholderLabel}}
    </label>
    {{#if error}}
        <span class="inputError">
            {{error}}
        </span>
    {{/if}}`
