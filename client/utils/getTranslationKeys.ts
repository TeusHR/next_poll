import {useTranslations} from "next-intl";

export const GetTranslationsForJson = <T>(namespace: string, json: Record<string, any>): T => {
  const funTrans = useTranslations(namespace);

  const processObject = (obj: Record<string, any>, prefix: string = ""): Record<string, any> => {
    const keys: string[] = Object.keys(obj);
    const result: Record<string, any> = {};

    keys.forEach((key) => {
      const currentKey = prefix ? `${prefix}.${key}` : key;

      if (typeof obj[key] === "object" && obj[key] !== null) {
        // Рекурсивный вызов для вложенных объектов
        const nestedResult = processObject(obj[key], currentKey);
        Object.assign(result, { [key]: nestedResult });
      } else {
        result[key] = funTrans(currentKey);
      }
    });

    return result;
  };

  return { [namespace]: processObject(json[namespace]) } as T;
};