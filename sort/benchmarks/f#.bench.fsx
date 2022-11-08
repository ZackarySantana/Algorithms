#load "../../utils/utils.fsx"
open Utils
#r "nuget: FSharp.Data, 5.0.2"
open FSharp.Data
open FSharp.Data.JsonExtensions

#load "../mergesort/f#.fsx"
open Mergesort

benchmark __SOURCE_DIRECTORY__ (fun record -> 
    let nums = ((record?arr.AsArray()) |> Array.toList) |> List.map (fun x -> x.AsInteger())
    fun _ -> mergesortAsc nums
)

// let withTiming func arg =
//     let sw = System.Diagnostics.Stopwatch.StartNew()
//     func arg |> ignore
//     sw.Stop()
//     sw.Elapsed

// let runNTimes times func arg =
//     Array.init times (fun _ -> func arg)

// let benchmark func arg =
//     let func = withTiming func
//     runNTimes 500 func arg
//         |> Array.averageBy(fun r -> r.TotalSeconds)
//         |> System.TimeSpan.FromSeconds

// #r "nuget: FSharp.Data, 5.0.2"
// open FSharp.Data
// open FSharp.Data.JsonExtensions
// let value = JsonValue.Load(__SOURCE_DIRECTORY__ + "/" + fsi.CommandLineArgs[1])
// for record in value do
//     printfn "%s" (record?group.AsString())
//     let nums = ((record?arr.AsArray()) |> Array.toList) |> List.map (fun x -> x.AsInteger())

//     let benchmarkTime = benchmark mergesortAsc nums 

//     printfn "%f" benchmarkTime.TotalSeconds
    

//     ()