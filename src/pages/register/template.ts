export default `<div class="centeredFlexContent">
        <h2>
            {{title}}
        </h2>
        <form onsubmit="(function() {
                window.location.hash = '#login'
                })()">
            <div class="formInputs">
                {{#each inputs}}
                    {{{this}}}
                {{/each}}
            </div>
            <div class="formButtons">
                {{{submitBtn}}}
                {{{linkToLogin}}}
            </div>
        </form>
    </div>`
