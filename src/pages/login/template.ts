export default `<div class="centeredFlexContent">
    <h2>
        {{title}}
    </h2>
    <form>
        <div class="formInputs">
            {{#each inputs}}
                {{{this}}}
            {{/each}}
        </div>
        <div class="formButtons">
            {{{submitBtn}}}
            {{{linkToRegister}}}
        </div>
    </form>
</div>`
