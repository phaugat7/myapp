import React, {useState} from "react";
import {StyleSheet} from "react-native";
import * as Yup from 'yup'
import {AppForm, AppFormField, AppFormPicker, SubmitButton} from "../components/forms";
import Screen from "../components/Screen";
import colors from "../config/colors";
import AppFormImagePicker from "../components/forms/AppFormImagePicker";
import listingsApi from '../api/listing';
import useLocation from "../hooks/useLocation";
import CategoryPickerItem from "../components/CategoryPickerItem";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    price: Yup.string().required().min(1).max(10000).label("Price"),
    description: Yup.string().label("Description"),
    category: Yup.object().required().nullable().label("Category"),
    images: Yup.array().min(1, "Please select atleast one image")
});

const categories = [
    {label: "Furniture", value: 1, backgroundColor: 'red', icon: 'apps'},
    {label: "Clothing", value: 2, backgroundColor: 'green', icon: 'email'},
    {label: "Camera", value: 3, backgroundColor: 'blue', icon: 'lock'},
];

function ListingEditScreen() {
    const location = useLocation();
    const [uploadVisible, setUploadVisible] = useState(false);
    const[progress, setProgress] = useState(0);

    const handleSubmit = async (listing, {resetForm}) => {
        setProgress(0);
        setUploadVisible(true);
        const result = await listingsApi.addListing(
            {...listing, location},
            (progress) => setProgress(progress),
        );
        if (!result.ok) {
            setUploadVisible(false);
            return alert('Could not save the listing.');
        }

        resetForm();
    }
    return (

        <Screen style={styles.container}>
            <UploadScreen onDone={() => setUploadVisible(false)} progress={progress} visible={uploadVisible}/>
            <AppForm
                initialValues={{
                    title: "",
                    price: "",
                    description: "",
                    category: null,
                    images: []
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <AppFormImagePicker name="images"/>
                <AppFormField maxlength={255} name="title" placeholder="Title"/>
                <AppFormField
                    keyboardType="numeric"
                    maxlength={8}
                    name="price"
                    placeholder="Price"
                    width={120}
                />
                <AppFormPicker
                    items={categories}
                    name="category"
                    numberOfColumns={3}
                    PickerItemComponent={CategoryPickerItem}
                    placeholder="Category"
                    width="50%"
                />
                <AppFormField
                    maxLength={255}
                    multiline
                    name="description"
                    numberOfLines={3}
                    placeholder="Description"
                />
                <SubmitButton title="Post"/>
            </AppForm>
        </Screen>

    );

}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20
    },
    screen: {
        backgroundColor: colors.light
    }
})
export default ListingEditScreen;
