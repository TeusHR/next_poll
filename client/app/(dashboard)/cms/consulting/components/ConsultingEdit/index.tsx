import React, {FC} from 'react'
// import {IConsulting, ICreateConsultingForm} from "@/types/Consulting";
// import {useSession} from "next-auth/react";
// import useAxiosAuth from "@/hooks/useAxiosAuth";
// import {ConsultingService} from "@/services/CMS.service";
// import {useForm} from "react-hook-form";
// import moment from "moment/moment";
// import {FileItem} from "@/utils/FIleToFileList";

type Props = {
    // consulting: IConsulting
}

const ConsultingEdit: FC<Props> = ({}) => {


    // const {
    //     handleSubmit,
    //     control,
    //     formState,
    //     reset,
    //     setValue,
    // } = useForm<ICreateConsultingForm>({
    //     mode: 'all',
    //     defaultValues: {
    //         title: '',
    //         text: '',
    //     }
    // })
    //
    // const [consulting, setConsulting] = useState<IConsulting>()
    //
    // const {status} = useSession()
    // const $apiAuth = useAxiosAuth()
    // const [isLoading, setIsLoading] = useState(false)
    // const [files, setFiles] = useState<FileItem[]>([]);
    //
    // useEffect(() => {
    //     if (status === 'authenticated') {
    //         ConsultingService.getConsulting($apiAuth).then(res => {
    //             setConsulting(res)
    //         })
    //     }
    // }, [$apiAuth, status]);
    //
    // useEffect(() => {
    //     console.log(consulting)
    // }, [consulting]);
    //
    // const renderFileName = (fileName: string): string => {
    //     return fileName.replace('/uploads/pdf/', '');
    // }
    //
    // useEffect(() => {
    //     if (consulting) {
    //         // setValue('title', consulting.title)
    //         // setValue('country', new Set([consulting.country]))
    //         // setValue('type', new Set([consulting.type]))
    //         // setValue('date', moment(consulting.date).format('YYYY-MM-DD'))
    //         // setValue('text', consulting.text)
    //         // const serverFiles = consulting.files.map(url => (
    //         //     {
    //         //         name: renderFileName(url),
    //         //         type: "server" as const,
    //         //         url: url,
    //         //     }
    //         // ));
    //         // setFiles(serverFiles);
    //     }
    // }, [consulting, setValue]);

    return (
        <div>

        </div>
    )
}

export default ConsultingEdit;