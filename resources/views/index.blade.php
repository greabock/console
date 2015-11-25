<!DOCTYPE html>
<html>
<head>
    <title>Console</title>
    <meta name="CSRF" content="{!! csrf_token() !!}">
    <link rel="stylesheet" href="{{ asset('/assets/greabock/console/css/console.css') }}">
</head>
<body>
<div class="container">
    <section>
        <label for="autoexec">
            <input checked type="checkbox" id="autoexec">
            autoexec
        </label>
    </section>
    <section>
        {!! csrf_field() !!}
        <div id="editor"></div>
    </section>
    <section id="response">
        <div style="padding-left: 100px">
            <pre id="output" > Output </pre>
        </div>
    </section>
</div>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.0/ace.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.0/theme-monokai.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.0/mode-php.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.0/ext-beautify.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.0/snippets/php.js"></script>
<script src="{{ asset('/assets/greabock/console/js/ac.js') }}"></script>
<script src="{{ asset('/assets/greabock/console/js/console.js') }}"></script>

<script>

</script>
<script>
</script>
</html>
