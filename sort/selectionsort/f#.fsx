module Selectionsort

let selectionsort lst compare =

    let rec getNext lst largest =
        match lst with
        | x::xs when (compare x largest) < 0 -> getNext xs x
        | x::xs -> getNext xs largest
        | _ -> largest

    let rec listWithoutNum lst num =
        match lst with
        | x::xs when x = num -> xs
        | x::xs -> x::(listWithoutNum xs num)
        | _ -> []

    let rec selectionsort unsorted sorted i =
        match unsorted with
        | x::xs when i > 0 -> 
            let largestNum = getNext xs x
            let newUnsorted = (listWithoutNum unsorted largestNum)
            let newSorted = sorted@[largestNum]
            selectionsort newUnsorted newSorted (i - 1)
        | _ -> sorted

    selectionsort lst [] lst.Length

let selectionsortAsc lst = selectionsort lst (fun x y -> x - y)
let selectionsortDesc lst = selectionsort lst (fun x y -> y - x)