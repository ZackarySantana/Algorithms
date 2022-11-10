#load "../../utils/utils.fsx"
open Utils
#r "nuget: FSharp.Data, 5.0.2"
open FSharp.Data
open FSharp.Data.JsonExtensions

#load "../mergesort/f#.fsx"
open Mergesort

let mergeBench = benchmark __SOURCE_DIRECTORY__ (fun record -> 
    let nums = ((record?data.AsArray()) |> Array.toList) |> List.map (fun x -> x.AsInteger())
    match nums.Length with
        | _ when nums.Length <= 100000 -> fun _ -> mergesortAsc nums
        | _ -> fun _ -> []
)

printfn "%A" mergeBench
