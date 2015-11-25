
var keywords = ["__halt_compiler()", "abstract", "array()", "break", "callable", "case", "catch", "class", "clone", "const", "continue", "declare", "default", "die()", "do", "echo", "else", "elseif", "empty()", "enddeclare", "endfor", "endforeach", "endif", "endswitch", "endwhile", "eval()", "exit()", "extends", "final", "finally", "for", "foreach", "function", "global", "goto", "if", "implements", "include", "include_once", "instanceof", "insteadof", "interface", "isset()", "list()", "namespace", "new", "or", "print", "private", "protected", "public", "require", "require_once", "return", "static", "switch", "throw", "trait", "try", "unset()", "use", "var", "while", "xor", "yield", "__CLASS__", "__DIR__", "__FILE__", "__FUNCTION__", "__LINE__", "__METHOD__", "__NAMESPACE__", "__TRAIT__"];

var autoExecute = true;

var send = function (data, callback)
{
    $.ajax({
        method: 'post',
        headers:{
            'X-CSRF-TOKEN' : $('meta[name="CSRF"]').attr('content')
        },
        data: data,
        success: callback,
        error: callback
    });
};
var completer = false;
var classes = {'code':"echo json_encode(array_merge(array_keys(include(base_path('vendor/composer/autoload_classmap.php'))), get_declared_classes()));"};
var functions = {'code':'echo json_encode(get_defined_functions());'};
send(functions, function(response){
    functions = JSON.parse(response.output);
});
send(classes, function(response){
    classes = JSON.parse(response.output);
});


var langTools = ace.require("ace/ext/language_tools");

ace.require("ace/config").set("workerPath", "https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.0");
var editor = ace.edit("editor");

editor.setOptions({
    //enableSnippets: false,
    enableLiveAutocompletion: true
});


var statement = 'free';
var session = editor.getSession();

editor.setTheme("ace/theme/monokai");
editor.setShowPrintMargin(false);
session.setMode("ace/mode/php");
editor.insert('<');
editor.insert('?');
editor.insert('php');
editor.insert('\n\n');
session.on('change', function(e){

    if(!$('#autoexec').prop('checked'))
    {
        return;
    }

    annotations = editor.getSession().getAnnotations();

    if(annotations.length)
    {
        $('#output').html($('<p/>').text(annotations[0].text+ " on line " +annotations[0].row).css({"color":"#DD9B8C"}));
        return;
    }

    if( statement == 'free'){
        statement = 'busy';

        send({'code' : session.getValue()}, function(response)
        {

            console.log(response);
            $('#output').html(response.output);
            statement = 'free';
        });

    }

});

var LaravelCompiler = {
    getCompletions: function(editor, session, pos, prefix, callback) {

        var token = session.getTokenAt(pos.row, pos.column);
        var matches = [];

        console.log(prefix);

        if(prefix.length > 1)
        {
            row = pos.row;
            column = token.start;
            while(column)
            {
                token = session.getTokenAt(pos.row, --column);

                if(token.value != ' ')
                {
                    break;
                }
            }

            console.log(token);

            if(token.type == 'keyword' && token.value == 'namespace')
            {
                $.each(classes, function(index, func){

                    func = func.split('\\');
                    func.pop();
                    func = func.join('\\');
                    func.trim();

                    if(func.length && func.indexOf(prefix) >= 0)
                    {
                        matches.push({
                            caption: func,
                            value: func,
                            meta: 'namespace'
                        });
                    }
                });

                return callback(null, matches);
            }

            if(token.type == 'keyword' && token.value == 'class') {
                return callback(null, [
                    {
                        caption: 'extends',
                        value: 'extends',
                        meta: 'keyword'
                    },
                    {
                        caption: 'implements',
                        value: 'implements',
                        meta: 'keyword'
                    }
                ]);
            }

            if(token.type == 'keyword' && (token.value == 'extends' || token.value == 'use'))
            {
                $.each(classes, function(index, func){

                    if(func.indexOf(prefix) >= 0)
                    {
                        matches.push({
                            caption: func,
                            value: func,
                            meta: 'class'
                        });
                    }
                });
            }

            if(token.type == 'keyword.operator' && token.value == '->')
            {
                var prevToken;
                column = token.start;
                while(column){

                    token = session.getTokenAt(pos.row, --column);
                    if(token.value != ' ')
                    {
                        break;
                    }
                }

                if(token.value == '$this')
                {

                }
            }
        }

        if(prefix.length > 1)
        {
            $.each(keywords, function(index, func){

                if(func.indexOf(prefix) >= 0)
                {
                    matches.push({
                        caption: func,
                        value: func,
                        meta: 'keyword'
                    });
                }
            });

            $.each(classes, function(index, func){

                if(func.indexOf(prefix) >= 0)
                {
                    matches.push({
                        caption: func,
                        value: func,
                        meta: 'class'
                    });
                }
            });

            $.each(functions.user, function(index, func){


                if(func.indexOf(prefix) >= 0)
                {
                    matches.push({
                        caption: func+'()',
                        value: func+'()',
                        meta: 'user function'
                    });
                }

            });

            $.each(functions.internal, function(index, func){


                if(func.indexOf(prefix) >= 0)
                {
                    matches.push({
                        caption: func+'()',
                        value: func+'()',
                        meta: 'internal function'
                    });
                }

            });

            callback(null, matches);
        }
    }
};

$(document).on('keydown', function(e){
    if (e.keyCode === 13 && e.ctrlKey) {

        annotations = editor.getSession().getAnnotations();

        if(annotations.length)
        {
            $('#output').html($('<p/>').text(annotations[0].text+ " on line " +annotations[0].row).css({"color":"#DD9B8C"}));
            return;
        }

        if( statement == 'free'){
            statement = 'busy';

            send({'code' : session.getValue()}, function(response)
            {
                $('#output').html(response.output);
                statement = 'free';
            });

        }
    }
});

$('.tab-label').on('click', function(){
    var target = $($(this).data('target'));

    $('.tab').removeClass('tab-active');

    target.addClass('tab-active');
});

langTools.addCompleter(LaravelCompiler);