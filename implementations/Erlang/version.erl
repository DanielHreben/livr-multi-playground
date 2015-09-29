#!/usr/bin/env escript
%%! -sname version

main([])->
    {ok, [{_, _, OliferOpts}]} = file:consult("deps/olifer/src/olifer.app.src"),
    OliferVersion = proplists:get_value(vsn, OliferOpts),
    ErlangVersion = erlang:system_info(otp_release),
    io:format(
        "Erlang/OTP version: ~p, Olifer version: ~p~n",
        [ErlangVersion, OliferVersion]
    ).