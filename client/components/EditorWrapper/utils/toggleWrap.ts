import { NodeType } from '@tiptap/pm/model'
import {getNodeType, isNodeActive, RawCommands} from "@tiptap/react";

export interface ItoggleWrap {
    typeOrName: string | NodeType,
    attributes: Record<string, any> | undefined
}

declare module '@tiptap/react' {
    interface Commands<ReturnType> {
        toggleWrap: {
            /**
             * Wraps nodes in another node, or removes an existing wrap.
             */
            toggleWrap: (typeOrName: string | NodeType, attributes?: Record<string, any>) => ReturnType
        }
    }
}

export const toggleWrap = ({typeOrName, attributes = {}}:ItoggleWrap) => ({ state, commands }:{ state:any, commands:any }):any => {
    const type = getNodeType(typeOrName, state.schema)
    const isActive = isNodeActive(state, type, attributes)

    console.log(type)
    console.log(isActive)

    if (isActive) {
        return commands.lift(type)
    }

    return commands.wrapIn(type, attributes)
}
