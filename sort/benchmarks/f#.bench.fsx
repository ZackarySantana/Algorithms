let withTiming func arg =
    let sw = System.Diagnostics.Stopwatch.StartNew()
    func arg |> ignore
    sw.Stop()
    sw.Elapsed

let runNTimes times func arg =
    Array.init times (fun _ -> func arg)

let benchmark func arg =
    let func = withTiming func
    runNTimes 500 func arg
    |> Array.averageBy(fun r -> r.TotalSeconds)
    |> System.TimeSpan.FromSeconds

#load "../mergesort/f#.fsx"
open Mergesort

let firstTime = benchmark mergesortAsc [1..100]

printfn "%f" firstTime.TotalSeconds


let value = JsonValue.Load(__SOURCE_DIRECTORY__ + "../../data/WorldBank.json")


//open System;;

// > Environment.CurrentDirectory;;
// val it : string = "C:\\"
// > Environment.CurrentDirectory <- @"c:\temp";;
// val it : unit = ()
// > Environment.CurrentDirectory;;
// val it : string = "c:\\temp"

