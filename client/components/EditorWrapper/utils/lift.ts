/// Lift the selected block, or the closest ancestor block of the
/// selection that can be lifted, out of its parent node.
import {liftTarget} from "prosemirror-transform";

export const liftParentNode = (state:any, dispatch:any, fromParent:number | null, toParent:number | null) => {
    let {$from, $to} = state.selection
    let range = $from.blockRange($to)

    let target = range && liftTarget(range)
    if (target == null)
        return false
    if (dispatch)
        dispatch(state.tr.lift(range!, target).scrollIntoView())
    return true
}
