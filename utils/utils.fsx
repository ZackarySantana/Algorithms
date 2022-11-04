module Utils

let test name actual expected = 
    match actual with
    | _ when actual = expected -> printfn "Passed F# '%s'" name
    | _ -> 
        printfn "Actual: %A" actual
        printfn "Expected: %A" expected
        failwithf "Failed F# %s" name