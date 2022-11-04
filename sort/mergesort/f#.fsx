module Mergesort

let mergesort lst compare =

    let rec merge lst1 lst2 =
        match (lst1, lst2) with
        | x::xs, y::ys ->
            match (x, y) with
            | _ when (compare x y) < 0 -> x::(merge xs lst2)
            | _ -> y::(merge lst1 ys)
        | x::xs, _ | _, x::xs -> x::xs
        | _ -> []

    let getFrontHalf lst =
        let rec loop lst i = 
            match lst with
            | x::xs when i < lst.Length / 2 + 1 -> x::(loop xs (i + 1))
            | _ -> []
        loop lst 0

    let getBackHalf lst =
        let rec loop lst i = 
            match lst with
            | _::xs when i < lst.Length / 2 + 1 -> loop xs (i + 1)
            | _ -> lst
        loop lst 0

    let rec mergesort lst =
        match lst with
        | _::_::_ -> merge (lst |> getFrontHalf |> mergesort) (lst |> getBackHalf |> mergesort)
        | _ -> lst

    mergesort lst

let mergesortAsc lst = mergesort lst (fun x y -> x - y)
let mergesortDesc lst = mergesort lst (fun x y -> y - x)
