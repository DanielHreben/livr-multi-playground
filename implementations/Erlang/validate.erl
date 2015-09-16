#!/usr/bin/env escript
%%! -pa deps/olifer/ebin deps/parselib/ebin deps/jsx/ebin -sname livr_playground

main([InputJson, RulesJson])->
    ok = olifer:start(),
    try
        Input = jsx:decode((list_to_binary(InputJson))),
        Rules = jsx:decode((list_to_binary(RulesJson))),

        JsonResult = case olifer:validate(Input, Rules) of
            {ok, Result} -> binary_to_list(jsx:encode([{<<"output">>, Result}]));
            {errors, Result} -> binary_to_list(jsx:encode([{<<"errors">>, Result}]))
        end,
        io:fwrite(JsonResult)
    catch
    _:_ ->
        io:format(standard_error, "~p~n", [erlang:get_stacktrace()]),
        exit("Olifer internal error")
    end.