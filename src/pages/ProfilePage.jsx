import { useContext, useState } from "react"
import {
  FiCalendar,
  FiEdit2,
  FiMail,
  FiSave,
  FiShield,
  FiUser,
  FiX,
} from "react-icons/fi"
import { AuthContext } from "../context/AuthContext"

const ProfilePage = () => {
  const { user, userRole, updateUserProfile, provider } =
    useContext(AuthContext)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    photoURL: user?.photoURL || "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (formData.name.trim().length < 3) {
      alert("Name must be at least 3 characters")
      return
    }

    setLoading(true)
    const result = await updateUserProfile(formData.name, formData.photoURL)
    setLoading(false)

    if (result.success) {
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: user?.displayName || "",
      photoURL: user?.photoURL || "",
    })
    setIsEditing(false)
  }

  const getProviderIcon = () => {
    if (provider === "google.com") return "🔵"
    if (provider === "github.com") return "⚫"
    return "📧"
  }

  const getProviderName = () => {
    if (provider === "google.com") return "Google"
    if (provider === "github.com") return "GitHub"
    return "Email/Password"
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A"
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Cover Background */}
          <div className="h-32 bg-gradient-to-r from-eco-primary to-eco-success"></div>

          {/* Profile Content */}
          <div className="px-8 pb-8">
            {/* Avatar Section */}
            <div className="flex flex-col -mt-16 mb-6">
              {/* Avatar centered */}
              <div className="flex justify-center md:justify-start mb-6">
                <div className="relative">
                  <img
                    src={
                      isEditing && formData.photoURL
                        ? formData.photoURL
                        : user?.photoURL || "/default-avatar.png"
                    }
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-gray-200"
                    onError={(e) => {
                      e.target.src = "/default-avatar.png"
                    }}
                  />
                  {userRole && (
                    <div className="absolute -bottom-2 -right-2">
                      <span
                        className={`
                          px-3 py-1 rounded-full text-xs font-semibold uppercase
                          flex items-center gap-1 shadow-md
                          ${
                            userRole === "admin"
                              ? "bg-gradient-to-r from-green-500 to-eco-success text-white"
                              : "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                          }
                        `}
                      >
                        {userRole === "admin" ? "👑" : "👤"}
                        {userRole}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Name and Action Buttons Row */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Name and Email */}
                <div className="flex-1 text-center md:text-left">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="text-2xl md:text-3xl font-bold text-gray-800 border-b-2 border-eco-primary focus:outline-none bg-transparent w-full max-w-md"
                      placeholder="Your Name"
                    />
                  ) : (
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 break-words">
                      {user?.displayName || "User"}
                    </h2>
                  )}
                  <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mt-2">
                    <FiMail className="text-eco-primary" />
                    <span className="break-all">{user?.email}</span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center md:justify-end">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-6 py-2.5 bg-eco-primary text-white rounded-lg hover:bg-eco-success transition-all shadow-md hover:shadow-lg font-semibold"
                    >
                      <FiEdit2 /> Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiSave /> {loading ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all shadow-md hover:shadow-lg font-semibold"
                      >
                        <FiX /> Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Edit Photo URL Field - Below the name/buttons row */}
              {isEditing && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Profile Photo URL
                  </label>
                  <input
                    type="url"
                    name="photoURL"
                    value={formData.photoURL}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-primary focus:border-transparent"
                    placeholder="https://example.com/your-photo.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter a URL to your profile photo
                  </p>
                </div>
              )}
            </div>

            {/* Account Information Grid */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* Account Provider */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <FiUser className="text-2xl text-eco-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Account Provider
                  </p>
                  <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <span>{getProviderIcon()}</span>
                    {getProviderName()}
                  </p>
                </div>
              </div>

              {/* Member Since */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <FiCalendar className="text-2xl text-eco-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Member Since
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatDate(user?.metadata?.creationTime)}
                  </p>
                </div>
              </div>

              {/* User Role */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <FiShield className="text-2xl text-eco-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Role</p>
                  <p className="text-lg font-semibold text-gray-800 capitalize">
                    {userRole || "User"}
                  </p>
                </div>
              </div>

              {/* Last Sign In */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <FiCalendar className="text-2xl text-eco-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Last Sign In
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatDate(user?.metadata?.lastSignInTime)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">📌 Note:</span> To change your email
            or password, please contact support or use your provider's account
            settings.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
