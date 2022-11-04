#load "../../utils/utils.fsx"
open Utils

#load "../mergesort/f#.fsx"
open Mergesort

let runSortTest name sortAlgo sortAlgoDesc =
    printfn "%s:" name
    do (
        let org = [3; 5; 2; 7; 15; 0; 2; 8; 4]
        test ("asc") (sortAlgo org) (List.sort org)
    )

    do (
        let org = [3; 5; 2; 7; 15; 0; 2; 8; 4]
        test ("desc") (sortAlgoDesc org) (List.sortDescending org)
    )

    do (
        let org = []
        test ("empty") (sortAlgo org) (List.sort org)
    )

runSortTest "mergesort" mergesortAsc mergesortDesc


#load "../selectionsort/f#.fsx"
open Selectionsort

runSortTest "selectionsort" selectionsortAsc selectionsortDesc
