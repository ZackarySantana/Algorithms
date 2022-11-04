package sort.mergesort;

import java.util.Arrays;
import java.util.Comparator;

public class Mergesort<T> {

    private final Comparator<T> _COMPARE;

    public Mergesort(Comparator<T> compare) {
        this._COMPARE = compare;
    }

    public T[] Mergesort(T[] arr) {
        return mergesort_helper(Arrays.copyOf(arr, arr.length));
    }

    private T[] mergesort_helper(T[] arr) {
        if (arr.length < 2) {
            return arr;
        }

        int middle = arr.length / 2;

        return merge(
            mergesort_helper(Arrays.copyOfRange(arr, 0, middle)),
            mergesort_helper(Arrays.copyOfRange(arr, middle, arr.length)),
            arr
        );
    }

    private T[] merge(T[] arr1, T[] arr2, T[] mergeInto) {

        int left = 0;
        int right = 0;
        int i = 0;

        for (; left < arr1.length && right < arr2.length; ++i) {
            if (this._COMPARE.compare(arr1[left], arr2[right]) < 0) {
                mergeInto[i] = arr1[left++];
            } else {
                mergeInto[i] = arr2[right++];
            }
        }

        for (; left < arr1.length; ++left) {
            mergeInto[i++] = arr1[left];
        }

        for (; right < arr2.length; ++right) {
            mergeInto[i++] = arr2[right];
        }

        return mergeInto;
    }
}