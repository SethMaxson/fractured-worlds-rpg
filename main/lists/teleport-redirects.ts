const TeleportRedirects: {
    /**The map ID found on the zone transition object. */
    id: string;
    /** The ID of the map to load instead. */
    substitution: string;
}[] = [
    { id: "somewhere-district-1", substitution: "somewhere-district-01" }
];

export default TeleportRedirects;