module Quicksort

let quicksort lst compare =

    let rec quicksort lst =
        match lst with
        | x::xs -> 
            let under = xs |> List.filter (fun y -> (compare x y) > 0) |> quicksort
            let over = xs |> List.filter (fun y -> (compare x y) <= 0) |> quicksort
            under@[x]@over
        | _ -> lst

    quicksort lst

let quicksortAsc lst = quicksort lst (fun x y -> x - y)
let quicksortDesc lst = quicksort lst (fun x y -> y - x)

