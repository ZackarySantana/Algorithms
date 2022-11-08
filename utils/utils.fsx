module Utils

let test name actual expected = 
    match actual with
    | _ when actual = expected -> printfn "  %s passed" name
    | _ -> 
        printfn "Actual: %A" actual
        printfn "Expected: %A" expected
        failwithf "Failed F# %s" name

#r "nuget: FSharp.Data, 5.0.2"
open FSharp.Data
open FSharp.Data.JsonExtensions
let benchmark sourceLocation func =
    let withTiming func arg =
        let sw = System.Diagnostics.Stopwatch.StartNew()
        func arg |> ignore
        sw.Stop()
        sw.Elapsed

    let runNTimes times func arg =
        Array.init times (fun _ -> func arg)

    let benchmark func arg =
        let func = withTiming func
        runNTimes 1 func arg
            |> Array.averageBy(fun r -> r.TotalSeconds)
            |> System.TimeSpan.FromSeconds

    let value = JsonValue.Load(sourceLocation + "/" + System.Environment.GetCommandLineArgs()[2])
    for record in value do
        let processedData = (func record)
        let benchmarkTime = benchmark processedData ()

        printfn "%s %f" (record?group.AsString()) benchmarkTime.TotalSeconds
        

        ()