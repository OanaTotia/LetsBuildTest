# LetsBuildTest

The problem

You are given a box with integer dimensions length x width x height. You
also have a set of cubes whose sides are powers of 2, e.g. 1x1x1, 2x2x2,
4x4x4 etc.
You need to fill the box with cubes from the set.
Write a program that for a given box and given set of cubes can determine
the smallest number of cubes needed to fill the box.
The set of cubes can be represented for instance as a list or array of
numbers, where the position in the list designates the dimension of the
cube. E.g. 100 10 1 means you have 100 cubes of 1x1x1 and 10 cubes of 2x2x2
and 1 cube of 4x4x4.
A problem specification is a sequence of lines separated by newline. Each
line has the box dimensions as the first three elements and the remaining
elements enumerate the given cubes. Elements are separated by a single
space. Lines are terminated by your platform’s newline convention.

The tests:
10 10 10 2000
10 10 10 900
4 4 8 10 10 1
5 5 5 61 7 1
5 5 6 61 4 1
1000 1000 1000 0 0 0 46501 0 2791 631 127 19 1
1 1 9 9 1

The results:
1000
-1
9
62
59
50070
9

Explanation:

1. The program reads from in.txt file line by line. Each line becomes 2 arrays: 
    box: the first 3 elements from line
    cubes: the number of cubes followed by their size

example: 2 3 4 5 6
    box: 2 3 4
    cubes: 5 1 6 2 (5 cubes 1x1x1, 6 cubes 2x2x2)

2. The program checkes if the total volume of the cubes is smaller then the volume of the box
in witch case it returns -1. 

3. If we have enough cubes the program checks if they fit in the box, starting with the biggest one
so in the case of 1 1 1 0 2 the total volume of cubes is bigger then the volume of the box but still the 
answer is -1 as a cube 2x2x2 cannot fit in a box 1x1x1

4. If the biggest cube fits the program checkes for how many of the biggest cubes can fit in the box
and goes to the smaller cube after it reduces the volume of the box that still needs to be filled.

5. The smallest number of cubes is returned by the findResult function and displayed in the console.
